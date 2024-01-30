```mermaid
graph TD;
    project-->app;
    app-->service;
    service-->login;
    login<-->main;
    login<-->LOGIN;
    login<-->LOGOUT;
    service<-->registration;
    registration<-->main;
    registration<-->landing;
    login<-->landing;
    
    app-->pages;
    pages-->landing;
    app-->component;

    disciplines-->main;
    mygroup-->main;
    mypersonalpage-->main;
    schedule-->main;
    session-->main;
    testing-->main
    
```
