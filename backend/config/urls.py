from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view
from rest_framework import routers
from catalogue import views
from users import viewsuser
schema_view = get_swagger_view(title='Pastebin API')

router = routers.SimpleRouter()

router.register(r'catalogue', views.Catalogue)
router.register(r'circulation',viewsuser.Circulation)
urlpatterns = [
    url(r'^$', schema_view),
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.jwt')),
    # url(r'^books/',include('catalogue.urls')),
    url(r'^api/',include(router.urls))

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

#Browsable API login
urlpatterns += [
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),

]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
