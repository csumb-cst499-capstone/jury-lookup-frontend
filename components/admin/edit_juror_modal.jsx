import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export function EditJurorModal({
  isOpen,
  onClose,
  selectedJuror,
  onSaveJuror,
}) {
  const [editedJuror, setEditedJuror] = useState({
    ...selectedJuror,
    FirstName: selectedJuror?.FirstName || "",
    LastName: selectedJuror?.LastName || "",
    MailingAddress: selectedJuror?.MailingAddress || "",
    City: selectedJuror?.City || "",
    State: selectedJuror?.State || "",
    Email: selectedJuror?.Email || "",
    BadgeNumber: selectedJuror?.BadgeNumber || "",
    SummonsDate: selectedJuror?.SummonsDate || "",
    ReportingLocation: selectedJuror?.ReportingLocation || "",
    CanPostpone: selectedJuror?.CanPostpone || false,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setEditedJuror({
      ...selectedJuror,
      FirstName: selectedJuror?.FirstName || "",
      LastName: selectedJuror?.LastName || "",
      MailingAddress: selectedJuror?.MailingAddress || "",
      City: selectedJuror?.City || "",
      State: selectedJuror?.State || "",
      Email: selectedJuror?.Email || "",
      BadgeNumber: selectedJuror?.BadgeNumber || "",
      SummonsDate: selectedJuror?.SummonsDate || "",
      ReportingLocation: selectedJuror?.ReportingLocation || "",
      CanPostpone: selectedJuror?.CanPostpone || false,
    });
    setHasChanges(false);
  }, [selectedJuror]);
  const handleChange = (field, value) => {
    value = value.target.value;
    if (field === "CanPostpone") {
      value = value === "true";
    }
    setEditedJuror((prevJuror) => ({
      ...prevJuror,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSaveJuror(editedJuror);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setEditedJuror({ ...selectedJuror });
    setHasChanges(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} color="primary" size="sm">
      <ModalContent>
        <ModalHeader>Edit Juror</ModalHeader>
        <ModalBody>
          {selectedJuror && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={editedJuror.FirstName}
                onChange={(value) => handleChange("FirstName", value)}
              />
              <Input
                label="Last Name"
                value={editedJuror.LastName}
                onChange={(value) => handleChange("LastName", value)}
              />
              <Input
                label="Mailing Address"
                value={editedJuror.MailingAddress}
                onChange={(value) => handleChange("MailingAddress", value)}
              />
              <Input
                label="City"
                value={editedJuror.City}
                onChange={(value) => handleChange("City", value)}
              />
              <Input
                label="State"
                value={editedJuror.State}
                onChange={(value) => handleChange("State", value)}
              />
              <Input
                label="Email"
                value={editedJuror.Email}
                onChange={(value) => handleChange("Email", value)}
              />
              <Input
                label="Badge Number"
                value={editedJuror.BadgeNumber}
                onChange={(value) => handleChange("BadgeNumber", value)}
              />
              <Input
                label="Summons Date"
                value={editedJuror.SummonsDate}
                onChange={(value) => handleChange("SummonsDate", value)}
              />
              <Input
                label="Reporting Location"
                value={editedJuror.ReportingLocation}
                onChange={(value) => handleChange("ReportingLocation", value)}
              />
              <div className="flex items-center bg-default-100 rounded-lg">
                <label className="m-3 text-tiny text-foreground-700">
                  Can Postpone:
                </label>
                <Dropdown
                  aria-label="Can Postpone"
                  variant="flat"
                  className="mr-8"
                >
                  <DropdownTrigger>
                    <Button>
                      {editedJuror.CanPostpone ? "true" : "false"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    title="Can Postpone"
                    selectedKeys={editedJuror.CanPostpone ? "true" : "false"}
                    onAction={(key) => console.log(key)}
                  >
                    <DropdownItem key="true">True</DropdownItem>
                    <DropdownItem key="false">False</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onPress={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} disabled={!hasChanges}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
