from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from .forms import ContactForm
from django.conf import settings

# Create your views here.
def index(request):
    return render(request, 'companywebsiteapp/index.html')

def contact_view(request):
    if request.method == "POST":
        form = ContactForm(request.POST)

        if form.is_valid():
            name = form.cleaned_data["name"]
            email = form.cleaned_data["email"]
            subject = form.cleaned_data["subject"]
            message = form.cleaned_data["message"]

            full_message = (
                f"Customer name: {name}\n"
                f"Customer email: {email}\n\n"
                f"Message:\n{message}"
            )

            try:
                send_mail(
                    subject=f"Website enquiry: {subject}",
                    message=full_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_EMAIL],
                    fail_silently=False,
                    reply_to=[email],
                )
                messages.success(
                    request,
                    "Thank you! Your message has been sent successfully."
                )
                return redirect("/#contact")

            except Exception:
                messages.error(
                    request,
                    "We could not send your message. Please try again "
                    "or email us directly."
                )
    else:
        form = ContactForm()

    return render(
        request,
        "companywebsiteapp/index.html",
        {"contact_form": form},
    )