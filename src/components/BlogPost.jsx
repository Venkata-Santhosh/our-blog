// BlogPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Container } from 'react-bootstrap';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    console.log(`../../markdowns/${slug}`)
    import(`../../markdowns/${slug}`)
      .then((res) => {

        fetch(res.default)
        .then(response => response.text())
        .then(text => {
          // Adjust image paths in markdown content
          // const updatedMarkdown = text.replace(/\.\.\/images/g, `${process.env.PUBLIC_URL}/images`);
          let updatedContent = text.replace(/\.\.\/public\/images\/(.*?\.png)/g, '/images/$1');
          updatedContent = updatedContent.replace(/\.\.\/public\/images\/(.*?\.gif)/g, '/images/$1');
          const parsedMarkdown = matter(updatedContent);
          const rawMarkup = marked(parsedMarkdown.content);
          // const rawMarkup = marked(content);
          console.log(rawMarkup)
          const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);

          setPost(sanitizedMarkup);
        })
        .catch(err => console.error('Failed to fetch markdown content', err));

      })
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <div>
      <Container style={{marginTop:'50px'}}>
        <div dangerouslySetInnerHTML={{ __html: post }} />
    </Container>
    </div>
  );
};

export default BlogPost;
