import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BlogCard = ({ title, image, excerpt, onClick }) => {
  return (
    <Card style={{  marginBottom: '2rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{excerpt}</Card.Text>
        <Button variant="primary" onClick={onClick}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
