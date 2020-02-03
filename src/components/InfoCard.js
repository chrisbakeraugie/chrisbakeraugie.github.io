import React from "react";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const InfoCard = (props) => {

    return (
        <Card className="info-card" id={props.id}>
            <Card.Body>
            
                <Card.Title>{props.positionTitle} <FontAwesomeIcon icon={props.icon} size="2x" style={props.iconStyle}></FontAwesomeIcon></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.positionPlace}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{props.positionDates}</Card.Subtitle>
                <Card.Text>{props.description}</Card.Text>
                
                {/* <Card.Link href={props.link}>{props.cardLinkOne}</Card.Link>
    <Card.Link href="#">{props.cardLinkTwo}</Card.Link>*/}
            </Card.Body>
        </Card>
    )
}

export default InfoCard;