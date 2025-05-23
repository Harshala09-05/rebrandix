from google import genai
from django.conf import settings


# Initialize the GenAI client with your API key
client = genai.Client(api_key="AIzaSyC2kn3jfJAkaAq1qRz31G8Q6bRr0Qoh1k4")

def get_answer_from_gemini(user_question, user_role):
    """
    Function to get an answer from the Gemini model based on user role and question.
    
    Args:
    user_question (str): The question asked by the user.
    user_role (str): The role of the user ('manufacturer', 'brander', or 'wholesaler').
    
    Returns:
    str: The answer generated by the Gemini model.
    """
    
    # Construct context for the user query
    context = f"User Role: {user_role}\nQuestion: {user_question}"
    
    # Combine system prompt with user-specific context
    prompt = f"""
    You are a support assistant for ReBrandX – a manufacturer to market platform connecting Manufacturers, Branders, and Wholesalers.
    
    Platform overview:
    - Manufacturers list products and can enable bidding or direct wholesaler sales.
    - Branders bid on products, rebrand them (name, logo, packaging), and sell to Wholesalers.
    - Wholesalers can purchase both branded products (from Branders) and unbranded products (from Manufacturers when no Brander claims them).
    
    Key processes:
    1. Product Listing: Manufacturers add products with details and can enable bidding with deadlines.
    2. Bidding System: Branders place bids, and Manufacturers select winners.
    3. Rebranding: Winning Branders customize the product with their branding elements.
    4. Sales: Branded products are sold by Branders; unbranded products by Manufacturers.
    
    Role-specific functions:
    - Manufacturers: Create profiles, list products, manage bids, sell directly to wholesalers if no branders bid.
    - Branders: Place bids on products, rebrand after winning, sell to wholesalers.
    - Wholesalers: Browse both branded and unbranded products, place bulk orders, track shipments.
    
    The user is a {user_role} and has asked: {user_question}
    
    Please provide a helpful, accurate response specific to their role and question.
    """

    # Use the GenAI client to generate content
    response = client.models.generate_content(
        model="gemini-2.0-flash",  # Specify the model
        contents=prompt,  # Send the prompt for content generation
    )
    
    # Return the generated text
    return response.text
# Example usage
# if _name_ == "main":
#     # Example test cases
# question = "Can I buy from a Brander directly?"
# role = "manufacturer"
# answer = get_answer_from_gemini(question, role)
# print(f"Answer: {answer}")