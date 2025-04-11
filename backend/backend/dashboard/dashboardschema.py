import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from .models import Product,Category
from graphene import Mutation, ID, Boolean, Field , String
from graphql import GraphQLError
from django.contrib.auth.models import User
from graphene_file_upload.scalars import Upload


class ProductType(DjangoObjectType):
    class Meta: 
        model = Product
        fields = "__all__"

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"
        



#Query
class Query(graphene.ObjectType):
    all_categories = graphene.List(CategoryType)
    category_by_id = graphene.Field(CategoryType , id = graphene.Int(required = True))

    all_products = graphene.List(ProductType)
    product_by_id = graphene.Field(ProductType, id = graphene.Int( required = True ))

    product_by_category = graphene.Field(ProductType , category_id = graphene.Int(required=True))


    def resolve_all_categories(self,info):
        return Category.objects.all()
    
    def resolve_category_by_id(self,info,id):
        return Category.objects.get(id=id)
    
    def resolve_all_products(self,info):
        return Product.objects.all()
    
    def resolve_product_by_id(self,info,id):
        return Product.objects.get(id=id)
    
    def resolve_product_by_category(self,info, category_id):
        return Product.objects.filter(category_id= category_id)
    

#Mutation

class CreateCategory(graphene.Mutation):

    category = graphene.Field(CategoryType)

    class Arguments:
        name = graphene.String(required = True)
        description = graphene.String(required = True )

    @classmethod
    def mutate(cls,root,info, name, description ):
        category = Category.objects.create(
            name = name,
            description = description
        )
        return CreateCategory(category = category)
    
    
    
    
class UpdateCategory(graphene.Mutation):
    category = graphene.Field(CategoryType)

    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()

    @classmethod
    def mutate(cls, root, info, id, name=None, description=None):
        try:
            category = Category.objects.get(pk=id)

            if name:
                category.name = name
            if description:
                category.description = description

            category.save()
            return UpdateCategory(category=category)

        except Category.DoesNotExist:
            raise GraphQLError("Category not found")
        


class DeleteCategory(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    @classmethod
    def mutate(cls, root, info, id):
        try:
            category = Category.objects.get(pk=id)
            category.delete()
            return DeleteCategory(success=True)
        except Category.DoesNotExist:
            raise GraphQLError("Category not found")


    

    
class CreateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)
    
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=True)
        category_id = graphene.Int(required=True)
        owner_id = graphene.ID(required=False)
        iso_certificate = Upload(required=False)  # Using Upload scalar
        product_image = Upload(required=False)    # For image upload
        iso_found = graphene.Boolean(default_value=False)
        certificate_number = graphene.Int()  # Default value added
        issuer = graphene.String()
        trust_score = graphene.Int(
            default_value=0,  # Example default
        )
        final_verdict = graphene.String()
    
    @classmethod 
    def mutate(cls, root, info, name, description, category_id, owner_id=None, iso_certificate=None, product_image=None, iso_found=False, certificate_number=0, issuer=None, trust_score=0, final_verdict=None):
        category = Category.objects.get(pk=category_id)
        
        # Get owner if owner_id is provided
        owner = None
        if owner_id:
            owner = User.objects.get(pk=owner_id)
        
        product = Product.objects.create(
            name=name, 
            description=description,
            category=category,
            owner_id=owner,
            iso_found=iso_found,
            certificate_number=certificate_number,
            issuer=issuer,
            trust_score=trust_score,
            final_verdict=final_verdict
        )
        
        # Handle file uploads if provided
        if iso_certificate:
            # This would need proper file handling depending on how your frontend passes files
            product.iso_certificate = iso_certificate
            
        if product_image:
            # This would need proper image handling depending on how your frontend passes images
            product.product_image = product_image
            
        product.save()
        return CreateProduct(product=product)
    
class UpdateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)
    
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        category_id = graphene.Int()
        owner_id = graphene.ID()
        iso_certificate = Upload(required=False)  # Using Upload scalar
        product_image = Upload(required=False)    # For image upload
        iso_found = graphene.Boolean(default_value=False)
        certificate_number = graphene.Int()  # Default value added
        issuer = graphene.String()
        trust_score = graphene.Int(
            default_value=0,  # Example default
        )
        final_verdict = graphene.String()
    
    @classmethod
    def mutate(cls, root, info, id, name=None, description=None, category_id=None, 
               owner_id=None, iso_certificate=None, product_image=None,iso_found=False,
               certificate_number=0, issuer=None, trust_score=0, final_verdict=None):
        try:
            product = Product.objects.get(pk=id)
            
            if name:
                product.name = name
            if description:
                product.description = description
            if category_id:
                product.category = Category.objects.get(pk=category_id)
            if owner_id:
                product.owner_id = User.objects.get(pk=owner_id)
            if iso_certificate:
                # Handle certificate file update
                product.iso_certificate = iso_certificate
            if product_image:
                # Handle product image update
                product.product_image = product_image
                
            product.save()
            return UpdateProduct(product=product)
        except Product.DoesNotExist:
            raise GraphQLError("Product not found")
        except Category.DoesNotExist:
            raise GraphQLError("Category not found")
        
        
class DeleteProduct(graphene.Mutation):
    success = graphene.Boolean()
    
    class Arguments:
        id = graphene.ID(required=True)
    
    @classmethod
    def mutate(cls, root, info, id):
        try:
            product = Product.objects.get(pk=id)
            product.delete()
            return DeleteProduct(success=True)
        except Product.DoesNotExist:
            raise GraphQLError("Product not found")


import graphene
from graphene_file_upload.scalars import Upload
from .utils import extract_text, analyze_certificate
import tempfile
import os

class CertificateResult(graphene.ObjectType):
    iso_9001_found = graphene.Boolean()
    certificate_number = graphene.String()
    issuer = graphene.String()
    trust_score = graphene.Int()
    verdict = graphene.String()

class VerifyCertificateMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    Output = CertificateResult

    def mutate(self, info, file, **kwargs):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)
            temp_file_path = temp_file.name

        text = extract_text(temp_file_path)
        result = analyze_certificate(text)
        os.remove(temp_file_path)

        return CertificateResult(
            iso_9001_found=result["iso_9001_found"],
            certificate_number=result["certificate_number"],
            issuer=result["issuer"],
            trust_score=result["trust_score"],
            verdict=result["verdict"]
        )


class DashboardMutation(graphene.ObjectType):
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()
    delete_product = DeleteProduct.Field()

    create_category = CreateCategory.Field()
    update_category = UpdateCategory.Field()
    delete_category = DeleteCategory.Field()
    verify_certificate = VerifyCertificateMutation.Field()
    
    
    
    

schema = graphene.Schema(query=Query, mutation=DashboardMutation)
