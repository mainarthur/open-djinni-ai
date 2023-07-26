import React from "react";
import useEvent from "react-use-event-hook";
import styled from "styled-components";
import "./popup.css";
import { useLocalStorageState } from "./useLocalStorageState";
import { EXPERIENCE_KEY, OPEN_AI_KEY, SKILLS_LIST_KEY } from "../constants";

const Popup = () => {
  const [apiKey, setApiKey] = useLocalStorageState(OPEN_AI_KEY, "");
  const [skills, setSkills] = useLocalStorageState(SKILLS_LIST_KEY, "");
  const [experience, setExperience] = useLocalStorageState(EXPERIENCE_KEY, "");

  chrome.runtime.onMessage.addListener(({ msgType, msg }) => {
    switch (msgType) {
      default:
        break;
    }
  });

  const handleApiKeyChange: React.ChangeEventHandler<HTMLInputElement> =
    useEvent((event) => {
      setApiKey(event.target.value);
    });
  const handleSkillsChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useEvent((event) => {
      setSkills(event.target.value);
    });
  const handleExperienceChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useEvent((event) => {
      setExperience(event.target.value);
    });

  return (
    <React.Fragment>
      <Nav>
        <Heading>OpenAI Djinni Apply</Heading>
      </Nav>
      <Main>
        <label>
          <div>OpenAI API Key</div>
          <div>
            <Input value={apiKey} onChange={handleApiKeyChange} />
          </div>
        </label>
        <label>
          <div>Your Skills</div>
          <div>
            <TextArea value={skills} onChange={handleSkillsChange} />
          </div>
        </label>
        <label>
          <div> Your Experience</div>
          <div>
            <TextArea value={experience} onChange={handleExperienceChange} />
          </div>
        </label>
      </Main>
    </React.Fragment>
  );
};

export default Popup;

const Nav = styled.header`
  display: flex;
  justify-content: center;
  background-color: #2d3646;
  padding: 5px;
`;

const Heading = styled.h1`
  font-size: 1.3rem;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 16px;
`;

const Input = styled.input``;

const TextArea = styled.textarea``;
