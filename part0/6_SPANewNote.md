::: mermaid
    sequenceDiagram
    participant user;
    participant browser;
    participant server;

    user->>browser: User clicks "save";
    activate browser;

    Note right of browser: The browser's Javascript code updates the notes list with the new entry;

    browser->>user: User sees their new note added;

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note;
    activate server;
    Note left of server: The request's body contains contents of text field and the current timestamp, which are saved by the server as a new note;
    server-->>browser: 201 response: "created";
    Note left of server: The response also includes a JSON file: {"message":"note created"};
    deactivate server;
    deactivate browser;
    

:::