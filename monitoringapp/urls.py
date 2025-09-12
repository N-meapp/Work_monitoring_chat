from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('login',views.login,name='login'),
    path('admin_dashboard',views.admin_dashboard,name='admin_dashboard'),
    path('delete-department/<int:pk>/', views.delete_department, name='delete_department'),
    path('delete-team/<int:pk>/', views.delete_team, name='delete_team'),

    path('admin_usermanagement',views.admin_usermanagement,name='admin_usermanagement'),
    path('delete/<int:id>/', views.delete_user, name='delete_user'),
    path('edit-user/', views.edit_user, name='edit_user'),
    path('teammember_project/', views.teammember_project, name='teammember_project'),


    path('teammember_task/update/<int:task_id>/', views.update_task, name='update_task'),
    path('teammember_task/delete/<int:task_id>/', views.delete_task, name='delete_task'),


    path('login/', views.login_view, name='login'),
    path('teamlead/dashboard/', views.teamlead_dashboard, name='teamlead_dashboard'),
    path('teamlead_reports', views.teamlead_reports, name='teamlead_reports'),
    path('teamlead_project_assigning', views.teamlead_project_assigning, name='teamlead_project_assigning'),
    path('projects/edit/<int:pk>/', views.project_assign_edit, name='project_assign_edit'),
    path('projects/delete/<int:pk>/', views.project_assign_delete, name='project_assign_delete'),
    


    path('teammember/dashboard/', views.teammember_dashboard, name='teammember_dashboard'),
    path("teamlead_repository/", views.teamlead_repository, name="teamlead_repository"),
    path('teamlead_repository/delete/<int:pk>/', views.teamlead_repository_delete, name='teamlead_repository_delete'),
    path('teamlead_profile/', views.teamlead_profile, name='teamlead_profile'),
    path('teamlead_notepad/', views.teamlead_notepad, name='teamlead_notepad'),
    path('teamlead_task/', views.teamlead_task, name='teamlead_task'),

    # Update Task (status change)
    path('teamlead_task/update/<int:task_id>/', views.update_task_teamlead, name='update_task_teamlead'),
    path('teamlead_task/delete/<int:task_id>/', views.delete_task_teamlead, name='delete_task_teamlead'),


    path("teammember_repository/", views.teammember_repository, name="teammember_repository"),
    path("teammember_profile/", views.teammember_profile, name="teammember_profile"),
    path("teammember_task/", views.teammember_task, name="teammember_task"),
    path('teammember_repository/delete/<int:pk>/', views.teammember_repository_delete, name='teammember_repository_delete'),
    path('teammember_notepad/', views.teammember_notepad, name='teammember_notepad'),



    path("forgot-password/", views.forgot_password, name="forgot_password"),
    path("verify-otp/", views.verify_otp, name="verify_otp"),
    path("reset-password/", views.reset_password, name="reset_password"),



    path("teamlead/logout/", views.teamlead_logout, name="teamlead_logout"),
    path("teammember/logout/", views.teammember_logout, name="teammember_logout"),


]
