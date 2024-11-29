from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            # Authenticate the user
            user = authenticate(
                username=request.data.get('username'), 
                password=request.data.get('password')
            )
            
            if not user:
                return Response({'success': False, 'message': 'Invalid credentials'}, status=401)

            # Generate tokens using the parent class
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            # Prepare the response
            res = Response()
            res.data = {
                'success': True,
                'role': user.role,  # Add the user's role to the response
                'username': user.username
            }
            res.data.update(tokens)  # Include access and refresh tokens

            # Set cookies
            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                #secure=False,  # Set to False in development if HTTPS is not used
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                #secure=False,  # Set to False in development if HTTPS is not used
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'success': False, 'message': 'An error occurred'}, status=500)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})
        
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    print("Headers received:", request.headers)  # Check for Authorization header
    print("User authenticated:", request.user.is_authenticated)  # Check user status
    print("User:", request.user)  # Check the user info
    try:
        # Prepare response
        res = Response({'success': True})
        
        # Delete cookies
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')  
        
        return res
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=500)
    
