from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        label="Your name",
        widget=forms.TextInput(attrs={
            "placeholder": "Enter your full name",
            "autocomplete": "name",
        }),
    )

    email = forms.EmailField(
        label="Your email",
        widget=forms.EmailInput(attrs={
            "placeholder": "you@example.com",
            "autocomplete": "email",
        }),
    )

    subject = forms.CharField(
        max_length=150,
        label="subject",
        widget=forms.TextInput(attrs={
            "placeholder": "How can we help?",
        }),
    )

    message = forms.CharField(
        label="Your message",
        widget=forms.Textarea(attrs={
            "placeholder":"Tell us about the cleaning service you need...",
            "rows": 6,
        }),
    )