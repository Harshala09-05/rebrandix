import graphene
# Import your algorithm function
from .chatbot_logic import get_answer_from_gemini

class AskQuestion(graphene.Mutation):
    class Arguments:
        question = graphene.String(required=True)

    question = graphene.String()
    answer = graphene.String()

    def mutate(self, info, question):
        user = getattr(info.context, 'user', None)
        if user and user.is_authenticated:
            answer = get_answer_from_gemini(question, user.role)
        else:
            answer = get_answer_from_gemini(question, "guest")
        return AskQuestion(question=question, answer=answer)

    
    
class Mutation(graphene.ObjectType):
    ask_question = AskQuestion.Field()
    
    
schema = graphene.Schema(mutation=Mutation)


# mutation {
#   askQuestion(question: "Explain supervised learning") {
#     question
#     answer
#   }
# }