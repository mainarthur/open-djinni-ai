import { EXPERIENCE_KEY, OPEN_AI_KEY, SKILLS_LIST_KEY } from "../constants";

const allApplyButtons = document.querySelectorAll(
  ".js-inbox-toggle-reply-form"
);

const applyButton = allApplyButtons[
  allApplyButtons.length - 1
] as HTMLButtonElement;
applyButton.style.background = "green";
applyButton.innerText = "Apply with ChatGPT";
const get = async (key: string) => (await chrome.storage.local.get(key))[key];
applyButton.addEventListener("click", () => {
  console.log("Applying!");

  setTimeout(async () => {
    const textarea = document.querySelector(
      "textarea.form-control[name=message]"
    ) as HTMLTextAreaElement;

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Hello, my skills are " +
            (await get(SKILLS_LIST_KEY)) +
            ", my experience:" +
            (await get(EXPERIENCE_KEY)) +
            " generate me a personalized apply message for a vacancy: " +
            (
              document.querySelector(
                ".row .row-mobile-order-2"
              ) as HTMLDivElement
            ).innerText,
        },
      ],
    };

    const response = await (
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + (await get(OPEN_AI_KEY)),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();

    textarea.value = response.choices[0].message.content;
  }, 500);
});
