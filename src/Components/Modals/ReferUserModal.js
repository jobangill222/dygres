import React, { useState, useContext, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { InputGroup, Form } from "react-bootstrap";
import { AiOutlineCopy } from "react-icons/ai";
import { MdCopyAll, MdOutlineContentCopy } from "react-icons/md";

import { BiCopy } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";
import { DContext } from "../../Context/DContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCopyToClipboard } from "@uidotdev/usehooks";


export default function ReferModal(props) {
  const { isShowReferModal, setIsShowReferModal, url } = props;

  const [copied, setCopied] = React.useState(false);

  const onChangeCopyValue = async () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };


  const { user } = useContext(DContext);
  const closePopup = async () => {
    setIsShowReferModal(false);
  };

  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);


  return (
    <>
      <Modal
        className="Actions-modal welcomepopup "
        show={true}
        onHide={closePopup}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="refer_header">
          <Modal.Title> Invite your friends to join dygres </Modal.Title>
          <div>
            <p className="mb-0 totalshare">
              {" "}
              Sign ups:{" "}
              <span> {user?.referradCount ? user.referradCount : 0}</span>
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <div>
              <p>
                Every user that signs up and completes level 1 verification through your unique link will grant you 1 point. This system will evolve overtime.
              </p>
            </div>
            <div>
              <InputGroup className="mt-3 refer_input">
                <Form.Control
                  placeholder="Link Address"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  defaultValue={url ? url : null}
                  disabled={true}
                />
                <InputGroup.Text id="basic-addon2">
                  {copied ? (
                    <div className="copiedbar">
                      <TiTickOutline />{" "}
                      <p className="content">Copied</p>
                    </div>
                  ) : (
                    <>
                      <div className="copiedbar" onClick={() => {
                        onChangeCopyValue()
                        copyToClipboard(url)
                      }}>
                        <BiCopy />
                        <div disabled={hasCopiedText} className="link" >copy</div>
                      </div>
                      <br>
                      </br>


                    </>


                  )}{" "}
                </InputGroup.Text>
              </InputGroup>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
