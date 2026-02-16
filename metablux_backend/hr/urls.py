from django.urls import path
from .views import *

urlpatterns = [
    path('employee/list',HR_Employee_List,name="hr_employee_list"),
    path('custom/script',CustomScript,name="custom"),
]
