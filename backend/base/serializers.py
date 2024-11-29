from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract role, defaulting to 'user' if not provided
        role = validated_data.get('role', 'user')
        
        # Create the user object with default flags
        is_staff = role == 'admin'  # Only admins are staff
        is_superuser = role == 'admin'  # Only admins are superusers

        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            role=role,
        )
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()
        return user

