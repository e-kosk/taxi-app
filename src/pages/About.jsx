import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "./About.module.scss"

function About() {
    return (
      <Layout>
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
      </Layout>
    );
  }

  export default About
