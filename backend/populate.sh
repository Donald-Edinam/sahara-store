if pgrep -x mongod > /dev/null
then
    echo "MongoDB is already running"
else
    echo "Starting MongoDB"
    mongod > /dev/null 2>&1 &

    sleep 3

    if pgrep -x mongod > /dev/null
    then
        echo "MongoDB is running"
    else
        echo "MongoDB failed to start"
    fi
fi

npm run dev &


REGISTER_URL="http://localhost:3000/auth/register"
PRODUCT_URL="http://localhost:3000/api/products"

# Register a user
response=$(curl -s -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "password": "password", "email": "johndoe28.com", "role": "Admin", "phone": "1234567890"}' $REGISTER_URL)

if [ -z "$response" ]
then
    echo "Failed to register user"
    exit 1
fi

token=$(echo $response | jq -r '.token')

if [ "$token" == "null" ] || [ -z "$token" ]
then
    echo "Failed to register user"
    exit 1
fi

echo "User registered successfully"
echo "token: $token"

# Define the products to be added
declare -A PRODUCTS=(
    ["Kenyan Coffee"]='{"name": "Kenyan Coffee", "price": 10.99, "description": "Rich, aromatic coffee beans from Kenya.", "category": "Beverages", "stock": 100, "imageURL": "https://example.com/images/kenyan-coffee.jpg", "tag": "coffee"}'
    ["Tanzanian Cloves"]='{"name": "Tanzanian Cloves", "price": 11.99, "description": "Aromatic cloves from Tanzania.", "category": "Spices", "stock": 110, "imageURL": "https://example.com/images/cloves.jpg", "tag": "cloves"}'
    ["Ethiopian Honey"]='{"name": "Ethiopian Honey", "price": 15.99, "description": "Pure, natural honey from Ethiopia.", "category": "Food", "stock": 70, "imageURL": "https://example.com/images/honey.jpg", "tag": "honey"}'
    ["Ghanaian Cocoa Butter"]='{"name": "Ghanaian Cocoa Butter", "price": 16.99, "description": "Rich, nourishing cocoa butter from Ghana.", "category": "Cosmetics", "stock": 65, "imageURL": "https://example.com/images/cocoa-butter.jpg", "tag": "cocoa butter"}'
    ["Egyptian Cotton Sheets"]='{"name": "Egyptian Cotton Sheets", "price": 79.99, "description": "Luxurious, high-quality cotton sheets from Egypt.", "category": "Home", "stock": 45, "imageURL": "https://example.com/images/cotton-sheets.jpg", "tag": "cotton sheets"}'
    ["Moroccan Argan Oil"]='{"name": "Moroccan Argan Oil", "price": 22.99, "description": "Premium, organic argan oil from Morocco.", "category": "Cosmetics", "stock": 50, "imageURL": "https://example.com/images/argan-oil.jpg", "tag": "argan oil"}'
    ["Kenyan Tea"]='{"name": "Kenyan Tea", "price": 12.99, "description": "Strong, flavorful tea from Kenya.", "category": "Beverages", "stock": 105, "imageURL": "https://example.com/images/kenyan-tea.jpg", "tag": "tea"}'
    ["Togolese Shea Butter"]='{"name": "Togolese Shea Butter", "price": 18.99, "description": "Nourishing, natural shea butter from Togo.", "category": "Cosmetics", "stock": 60, "imageURL": "https://example.com/images/shea-butter.jpg", "tag": "shea butter"}'
    ["Botswana Leather Handbags"]='{"name": "Botswana Leather Handbags", "price": 150.00, "description": "Elegant, handmade leather handbags from Botswana.", "category": "Fashion", "stock": 25, "imageURL": "https://example.com/images/leather-handbags.jpg", "tag": "handbags"}'
    ["South African Wine"]='{"name": "South African Wine", "price": 24.99, "description": "Fine wine from South Africa.", "category": "Beverages", "stock": 65, "imageURL": "https://example.com/images/south-african-wine.jpg", "tag": "wine"}'
    ["Ugandan Vanilla Beans"]='{"name": "Ugandan Vanilla Beans", "price": 32.99, "description": "High-quality, flavorful vanilla beans from Uganda.", "category": "Spices", "stock": 45, "imageURL": "https://example.com/images/vanilla-beans.jpg", "tag": "vanilla beans"}'
)

for PRODUCT in "${!PRODUCTS[@]}"; do
    DATA="${PRODUCTS[$PRODUCT]}"
    curl -X POST $PRODUCT_URL -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$DATA"
done