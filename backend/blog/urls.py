from django.urls import path
from .views import ProductView,ProductDetail,ProductFeature,ProductCategory

urlpatterns = [
    path('', ProductView.as_view()),
    path('featured', ProductFeature.as_view()),
    path('category', ProductCategory.as_view()),
    path('<slug>', ProductDetail.as_view()),
]
