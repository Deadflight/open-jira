import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx)

    return initalProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel='shortcut' href='/favicon.ico' />
          <html lang="en" />
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://opens-jira-deadflight.herokuapp.com/"/>
          <meta property="og:description" content="Open Jira TO DO Web App similar to Jira"/>
          <meta property="og:image" content="https://portfolio-nextjs-sigma.vercel.app/images/open-jira.png" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument