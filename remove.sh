if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <github_api_token> <owner> <repo>"
    exit 1
fi

# Assign input arguments to variables
GITHUB_API_TOKEN=$1
OWNER=$2
REPO=$3

# GitHub API URL
GITHUB_API_URL="https://api.github.com/repos/$OWNER/$REPO"

# Use curl to delete the repository
response=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE -H "Authorization: token $GITHUB_API_TOKEN" $GITHUB_API_URL)

# Check the response status code
if [ "$response" -eq 204 ]; then
    echo "Repository '$OWNER/$REPO' successfully deleted."
elif [ "$response" -eq 404 ]; then
    echo "Repository '$OWNER/$REPO' not found."
elif [ "$response" -eq 403 ]; then
    echo "Access forbidden. Check if the token has the correct permissions."
else
    echo "Failed to delete the repository. HTTP status code: $response"
fi
