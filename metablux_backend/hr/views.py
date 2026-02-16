import json
from authentication.models import *
from metablux_internal.models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def HR_Employee_List(request):
    user_db = list(User.objects.filter(master_workspace_id=request.user.master_workspace_id).values().order_by('id'))
    return Response({
        "success":True,
        "data":user_db
    })

@api_view(['GET'])
def CustomScript(request):
    # workspace = User.objects.all()
    # for i in workspace:
    #     i.master_workspace_id=1
    #     i.save()
    return Response({
        "success":True
    })