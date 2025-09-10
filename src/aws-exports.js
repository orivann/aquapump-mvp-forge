// IMPORTANT: Fill in your own AWS Cognito configuration details here.
const awsmobile = {
    "aws_project_region": "us-east-1", // e.g., "us-east-1"
    "aws_cognito_identity_pool_id": "us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // e.g., "us-east-1:12345678-1234-1234-1234-123456789012"
    "aws_cognito_region": "us-east-1", // e.g., "us-east-1"
    "aws_user_pools_id": "us-east-1_xxxxxxxxx", // e.g., "us-east-1_abcdefghi"
    "aws_user_pools_web_client_id": "xxxxxxxxxxxxxxxxxxxxxx", // e.g., "1a2b3c4d5e6f7g8h9i0j1k2l3m"
    "oauth": {},
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
