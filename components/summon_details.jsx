import { Container, Text, Input } from "@nextui-org/react";
import { Postpone } from "./postpone";

export function SummonDetails(props) { 
    const { juror } = props;
    return (
        <Container>
            <Container>
            <Text h1 align={"center"}>Summon Details</Text>
                <Text>Name: {props.FirstName} { props.LastName}</Text>
                <Text>Summon Date: {props.SummonsDate}</Text>
                <Text>Badge Number: {props.BadgeNumber}</Text>
                <Text>Group Number: {props.GroupNumber}</Text>
                <Text>Reporting Location: {props.ReportingLocation}</Text>
                {(props.CanPostpone) ? <Postpone { ...{props}} /> : (<div><Text weight="bold">Cannot Postpone</Text></div>)}
            </Container>
        </Container>
    )
}
// default props

const today = new Date();
SummonDetails.defaultProps = {
    props: {
        FirstName: "",
        LastName: "",
        BadgeNumber: 0,
        GroupNumber: 0,
        SummonsDate: "2023-06-19",
        ReportingLocation: "King City Courthouse",
        CanPostpone: true,
    }
}


