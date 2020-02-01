import React from "react";
import Card from 'react-bootstrap/Card';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Project = (props) => {

    return (
        <Card className="project-card">
          <a className="project-card-link" href={props.projectLink} target="_blank" rel="noopener noreferrer">
            <Card.Img className="card-image" varient="top" src={props.imageSource} alt={props.altDesc}></Card.Img>
          <Card.Body>
            <Card.Title>{props.cardTitle}</Card.Title>
            <Card.Text>
              {props.cardDesc}
            </Card.Text>
          </Card.Body>
          </a>
          <a href={props.githubLink} target="_blank" rel="noopener noreferrer">
            <Card.Footer className="subtitle-link">
              Find the code on github  <FontAwesomeIcon icon={faGithub} size="1x"></FontAwesomeIcon>
            </Card.Footer>
          </a>
        </Card>
    )
}

export default Project;