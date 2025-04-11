import graphene
from dashboard.authschema import Query as AuthQuery, AuthMutations
from dashboard.dashboardschema import Query as DashboardQuery, DashboardMutation
from ai_chatbot.schema import Mutation as AiChatbotMutation
class Query(AuthQuery, DashboardQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutations, DashboardMutation,AiChatbotMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
