import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import matter from 'gray-matter';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';

const BlogsContainer = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // dynamically import all markdown files from the `markdowns` folder
    const importAll = (r) => {
      // Use Promise.all to wait for all files to be processed
      return Promise.all(r.keys().map((fileName) => {
        return import(`../../markdowns/${fileName.substr(2).replace(/\/index\.md$/, '')}`)
          .then((res) => {
            return fetch(res.default)
              .then(response => response.text())
              .then(text => {
                let updatedContent = text.replace(/\.\.\/public\/images\/(.*?\.png)/g, '/images/$1');
                updatedContent = updatedContent.replace(/\.\.\/public\/images\/(.*?\.gif)/g, '/images/$1');
                const parsedMarkdown = matter(updatedContent);
                return ({
                  slug: fileName.substr(2).replace(/\/index\.md$/, ''),
                  parsedContent: parsedMarkdown
                });
              });
          });
      }));
    };
    const postsContext = require.context('../../markdowns', true, /\.md$/);

    importAll(postsContext)
    .then(posts => {
      setPosts(posts); // Ensure this is called once all posts are loaded
    })
    .catch(error => {
      console.error("Error loading posts:", error);
    });

  }, []);

  // Function to handle when a blog card is clicked
  const handleCardClick = (slug) => {
    // Do something when a card is clicked, e.g., navigate to post details
    navigate(`/blog/${slug}`)
  };

  return (
    <Container style={{marginTop:'100px'}}>
      <Row>
        {posts.map((post, index) => {
          return (
          <Col key={index} sm={12} md={6} lg={12}>
            <BlogCard
              title={post.parsedContent.data.title}
              image={post.parsedContent.data.thumbnail} // Make sure your Markdown metadata includes an image path
              excerpt={post.parsedContent.data.description} // Description should be a part of your Markdown metadata
              onClick={() => handleCardClick(post.slug)}
            />
          </Col>
        )
        })}
      </Row>
    </Container>
  );
};

export default BlogsContainer;
