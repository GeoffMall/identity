package main

import (
	"bytes"
	"log"
	"net/http"
	"net/smtp"
	"text/template"
)

type SmtpTemplateData struct {
	From    string
	To      string
	Subject string
	Body    string
}

const emailTemplate = `From: &#123;&#123;.From&#125;&#125;
To: &#123;&#123;.To&#125;&#125;
Subject: &#123;&#123;.Subject&#125;&#125;

&#123;&#123;.Body&#125;&#125;

Sincerely,

&#123;&#123;.From&#125;&#125;
`

func CreateVerfication(email string) {
	var doc bytes.Buffer
	randString := RandStringRunes(20)
	validateAt := string("Validate your email at: " + randString)

	auth := smtp.PlainAuth("",
		Cfg.Email.Username,
		Cfg.Email.Password,
		Cfg.Email.Endpoint,
	)

	context := &SmtpTemplateData{
		Cfg.Email.Username,
		email,
		"Verify your email",
		validateAt,
	}

	t, err := template.New("emailTemplate").Parse(emailTemplate)
	if err != nil {
		log.Print("error trying to parse mail template")
	}

	err = t.Execute(&doc, context)
	if err != nil {
		log.Print("error trying to execute mail template")
	}

	err = smtp.SendMail(Cfg.Email.Endpoint+":"+Cfg.Email.Port,
		auth,
		Cfg.Email.Username,
		[]string{email},
		doc.Bytes())

	if err != nil {
		log.Print("ERROR: attempting to send a mail ", err)
	}

}

func storeVerification() {

}

func ValidateEmail(w http.ResponseWriter, r *http.Request) {

}

