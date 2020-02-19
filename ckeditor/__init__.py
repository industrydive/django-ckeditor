from __future__ import absolute_import
import os

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

# Following PEP 440 Standards
__version__ ='4.4.7+dive.ckeditor.12' # update this when deploying new version to production

if 'ckeditor' in settings.INSTALLED_APPS:
    # Confirm CKEDITOR_UPLOAD_PATH setting has been specified.
    try:
        settings.CKEDITOR_UPLOAD_PATH
    except AttributeError:
        raise ImproperlyConfigured("django-ckeditor requires \
                CKEDITOR_UPLOAD_PATH setting. This setting specifies an \
                relative path to your ckeditor media upload directory. Make \
                sure you have write permissions for the path, i.e.: \
                CKEDITOR_UPLOAD_PATH = 'content/ckeditor/' which \
                will be added to SITE_MEDIA/MEDIA_ROOT where needed by storage engine.")
