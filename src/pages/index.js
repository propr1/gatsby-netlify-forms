import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {

  const [formState, setFormState] = useState({
    name: "",
    email: "",
  })

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formState })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
}

  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  return (
    <div>
    <Layout>
    <Seo title="Gatsby Netlify Forms" />
    

    <form onSubmit={handleSubmit} name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="contact" />  
      <label htmlFor="name">Name</label>
      <input 
        id="name" 
        name="name"
        type="text" 
        onChange={handleChange}
        value={formState.name}
        placeholder="Enter your name"
      />
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        name="email"
        type="email" 
        onChange={handleChange}
        value={formState.email}
        placeholder="Enter your email"
      />

      <button type="submit">Submit</button>

    </form>
  </Layout>
  </div>

  )
}

export default IndexPage
