import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getDetail } from '@services/articles';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Preview() {
  const [article, setArticle] = React.useState({});
  const { id } = useParams();
  useEffect(() => {
    console.log('id', id);
    getDetail({
      _id: id,
    }).then(res => {
      setArticle(res);
      document.title = res.title;
    });
  }, []);

  return (
    <div
      style={{
        marginTop: '15px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        background: '#fff',
      }}
    >
      {article.type === 'markdown' ? (
        <Markdown
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter {...rest} PreTag='div' language={match[1]} style={solarizedlight}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {article.content}
        </Markdown>
      ) : (
        <div
          style={{
            marginTop: '15px',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px',
            background: '#fff',
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      )}
    </div>
  );
}
