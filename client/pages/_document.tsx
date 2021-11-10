import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // locale is in ctx.locale

    return { ...initialProps, locale: ctx?.locale || 'en' };
  }

  render = () => (
    <Html
      dir={this.props.locale === 'fa' ? 'rtl' : 'ltr'}
      lang={this.props.locale}
    >
      <Head />
      <body
        className={this.props.locale === 'fa' ? 'rtl' : 'ltr'}
        // data-bs-spy="scroll"
        // data-bs-target="#header"
        // data-bs-offset={0}
        // tabIndex={0}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
