import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
} from "@nextui-org/react";

export function ViewDetailsModal({ isOpen, onClose, selectedJuror }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} color="primary" size="lg">
      <ModalContent>
        <ModalHeader>View Details</ModalHeader>
        <ModalBody>
          {selectedJuror && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={selectedJuror.FirstName}
                isReadOnly
              />
              <Input
                label="Last Name"
                value={selectedJuror.LastName}
                isReadOnly
              />
              <Input
                label="Mailing Address"
                value={selectedJuror.MailingAddress}
                isReadOnly
              />
              <Input label="City" value={selectedJuror.City} isReadOnly />
              <Input label="State" value={selectedJuror.State} isReadOnly />
              <Input label="Email" value={selectedJuror.Email} isReadOnly />
              <Input
                label="Badge Number"
                value={selectedJuror.BadgeNumber}
                isReadOnly
              />
              <Input
                label="Summons Date"
                value={selectedJuror.SummonsDate}
                isReadOnly
              />
              <Input
                label="Reporting Location"
                value={selectedJuror.ReportingLocation}
                isReadOnly
              />
              <Input
                label="Can Postpone"
                value={selectedJuror.CanPostpone ? "Yes" : "No"}
                isReadOnly
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Link color="secondary" onClick={onClose}>
            Close
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ViewDetailsModal;
