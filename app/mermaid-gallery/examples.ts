export interface MermaidExample {
  id: string
  title: string
  blurb: string
  useCases: string[]
  code: string
}

export const examples: MermaidExample[] = [
  {
    id: "flowchart",
    title: "Flowchart",
    blurb: "Nodes and edges for processes, decisions, and flows. The workhorse of the Mermaid family.",
    useCases: ["CI/CD pipelines","Decision trees","Algorithms and business processes"],
    code: `flowchart TD
    A[Push to main] --> B{CI checks pass?}
    B -->|Yes| C[Build container image]
    B -->|No| D[Notify author]
    D --> E[Fix and re-push]
    E --> B
    C --> F[Push to registry]
    F --> G{Deploy approved?}
    G -->|Yes| H[Rolling deploy to prod]
    G -->|No| I[Hold for review]
    H --> J[Smoke tests]
    J --> K{Healthy?}
    K -->|Yes| L[Done]
    K -->|No| M[Rollback]`,
  },
  {
    id: "sequence",
    title: "Sequence Diagram",
    blurb: "How actors and systems exchange messages over time. The classic for API and protocol docs.",
    useCases: ["API request flows","Auth handshakes (OAuth, SAML)","Debugging distributed interactions"],
    code: `sequenceDiagram
    autonumber
    participant U as User
    participant C as Client App
    participant A as Auth Server
    participant R as Resource API

    U->>C: Click "Sign in"
    C->>A: GET /authorize (client_id, scope)
    A->>U: Login page
    U->>A: Enter credentials
    A->>C: Redirect with auth code
    C->>A: POST /token (code, client_secret)
    A-->>C: access_token + refresh_token
    C->>R: GET /profile (Bearer token)
    R-->>C: User profile JSON
    C-->>U: Signed-in dashboard
    Note over C,R: Tokens expire in 1h - the refresh_token renews them`,
  },
  {
    id: "class",
    title: "Class Diagram",
    blurb: "UML classes, members, and relationships for object-oriented designs.",
    useCases: ["Domain modeling","Codebase documentation","Planning refactors"],
    code: `classDiagram
    class Vehicle {
        +String make
        +String model
        +int year
        +start() void
        +stop() void
    }
    class Car {
        +int doors
        +openTrunk() void
    }
    class Engine {
        +int horsepower
        +ignite() void
    }
    class Driver {
        +String name
        +drive(Vehicle v) void
    }
    Vehicle <|-- Car
    Car *-- Engine : contains
    Driver --> Vehicle : drives`,
  },
  {
    id: "state",
    title: "State Diagram",
    blurb: "States and the transitions between them. Perfect for anything with a lifecycle.",
    useCases: ["Order / ticket lifecycles","UI component states","Protocol state machines"],
    code: `stateDiagram-v2
    [*] --> Created
    Created --> Paid : payment received
    Created --> Cancelled : timeout
    Paid --> Shipped : packed
    Paid --> Refunded : chargeback
    Shipped --> Delivered : signed
    Shipped --> Returned : customer return
    Delivered --> [*]
    Cancelled --> [*]
    Refunded --> [*]
    Returned --> Refunded : refund issued`,
  },
  {
    id: "er",
    title: "Entity Relationship Diagram",
    blurb: "Database tables, attributes, and cardinalities without opening a schema tool.",
    useCases: ["Database schema design","Onboarding to an existing DB","Data-model reviews"],
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "listed in"
    CUSTOMER {
        string id PK
        string name
        string email
    }
    ORDER {
        string id PK
        string customer_id FK
        date placed_at
        string status
    }
    LINE_ITEM {
        string order_id FK
        string product_id FK
        int quantity
    }
    PRODUCT {
        string id PK
        string name
        float price
    }`,
  },
  {
    id: "journey",
    title: "User Journey",
    blurb: "A user's experience across steps, scored for satisfaction. UX's favorite one-pager.",
    useCases: ["UX research synthesis","Customer experience mapping","Pain-point spotting"],
    code: `journey
    title Morning coffee run
    section Leave home
      Grab keys: 5: Me
      Walk to car: 4: Me
    section Buy coffee
      Queue up: 3: Me, Barista
      Order oat latte: 5: Me
      Wait for drink: 2: Me
      Pay: 4: Me
    section Head to work
      Drive to office: 5: Me`,
  },
  {
    id: "gantt",
    title: "Gantt Chart",
    blurb: "Tasks on a timeline with dependencies. Project plans that fit in a markdown file.",
    useCases: ["Release planning","Sprint / milestone tracking","Dependency visualization"],
    code: `gantt
    title Website relaunch plan
    dateFormat YYYY-MM-DD
    section Design
    Wireframes      :done,   des1, 2026-10-01, 2026-10-07
    Visual design   :active, des2, 2026-10-08, 2026-10-14
    section Build
    Frontend        :        dev1, after des2, 10d
    Backend API     :        dev2, after des2, 12d
    section Launch
    QA pass         :        qa1, after dev1, 5d
    Deploy to prod  :crit,   dep1, after qa1, 2d`,
  },
  {
    id: "pie",
    title: "Pie Chart",
    blurb: "Part-of-a-whole proportions in a few lines. No charting library required.",
    useCases: ["Survey results","Market / traffic share","Budget breakdowns"],
    code: `pie title Browser share, Sept 2026
    "Chrome" : 62
    "Safari" : 19
    "Edge" : 6
    "Firefox" : 5
    "Other" : 8`,
  },
  {
    id: "requirement",
    title: "Requirement Diagram",
    blurb: "Requirements, system elements, and how they satisfy, trace, and verify each other.",
    useCases: ["Systems engineering docs","Compliance traceability","Acceptance criteria mapping"],
    code: `requirementDiagram
    requirement login_req {
        id: 1
        text: "Users can sign in with email and password."
        risk: high
        verifymethod: test
    }
    requirement sso_req {
        id: 2
        text: "Users can sign in with Google SSO."
        risk: medium
        verifymethod: inspection
    }
    element web_app {
        type: "web application"
    }
    web_app - satisfies -> login_req
    web_app - satisfies -> sso_req
    sso_req - traces -> login_req`,
  },
  {
    id: "gitgraph",
    title: "Git Graph",
    blurb: "Branches, commits, merges, and tags as a picture. Worth a thousand `git log --graph`s.",
    useCases: ["Explaining branching strategy","Release notes visuals","Git tutorials"],
    code: `gitGraph
    commit id: "init"
    branch feature
    checkout feature
    commit id: "add parser"
    commit id: "add tests"
    checkout main
    commit id: "hotfix"
    checkout feature
    merge main
    checkout main
    merge feature
    commit id: "release v1.0" tag: "v1.0"`,
  },
  {
    id: "mindmap",
    title: "Mindmap",
    blurb: "Ideas radiating from a central topic. Brainstorming, straight into the doc.",
    useCases: ["Brainstorming sessions","Topic outlines","Knowledge mapping"],
    code: `mindmap
  root((Mermaid))
    Diagrams
      Flowchart
      Sequence
      Class
      State
      ER
    Charts
      Gantt
      Pie
      Quadrant
      XY
      Radar
    Extras
      Idea maps
      Roadmaps
      Gitgraph
      Kanban`,
  },
  {
    id: "timeline",
    title: "Timeline",
    blurb: "Events laid out chronologically. History lessons and roadmaps in plain text.",
    useCases: ["Project roadmaps","Company history","Incident timelines"],
    code: `timeline
    title History of the web
    1990 : Tim Berners-Lee proposes the World Wide Web
    1993 : Mosaic browser launches
    1998 : Google founded
    2004 : Web 2.0 and social media take off
    2007 : iPhone launches the mobile era
    2022 : ChatGPT sparks the AI wave`,
  },
  {
    id: "c4",
    title: "C4 Diagram",
    blurb: "Context, container, and component views of software architecture, C4-model style.",
    useCases: ["System context docs","Architecture reviews","Onboarding engineers"],
    code: `C4Context
    title Online bookstore - system context
    Person(customer, "Customer", "Buys books online")
    System(shop, "Bookstore", "Lets customers browse and order books")
    System_Ext(payments, "Payment gateway", "Processes card payments")
    SystemDb(warehouse, "Warehouse DB", "Tracks stock and shipments")

    Rel(customer, shop, "Browses and orders")
    Rel(shop, payments, "Charges cards via")
    Rel(shop, warehouse, "Reads and writes")`,
  },
  {
    id: "quadrant",
    title: "Quadrant Chart",
    blurb: "Two axes, four boxes. The eternal 2x2 matrix for prioritization.",
    useCases: ["Feature prioritization","Risk matrices","Market positioning"],
    code: `quadrantChart
    title Prioritize features
    x-axis "Low effort" --> "High effort"
    y-axis "Low value" --> "High value"
    quadrant-1 "Do later"
    quadrant-2 "Quick wins"
    quadrant-3 "Skip"
    quadrant-4 "Big bets"
    Dark mode: [0.3, 0.8]
    SSO login: [0.2, 0.9]
    Rewrite in Rust: [0.9, 0.5]
    New logo: [0.2, 0.2]`,
  },
  {
    id: "xychart",
    title: "XY Chart",
    blurb: "Bar and line charts on x/y axes. The spreadsheet chart you can version-control.",
    useCases: ["Metrics dashboards in docs","Trend reporting","A/B test results"],
    code: `xychart-beta
    title "Signups per month"
    x-axis [Jan, Feb, Mar, Apr, May, Jun]
    y-axis "Signups" 0 --> 500
    bar [120, 200, 180, 320, 410, 480]
    line [100, 150, 220, 260, 380, 450]`,
  },
  {
    id: "kanban",
    title: "Kanban Board",
    blurb: "Columns of cards for work in progress. A board that lives in your repo.",
    useCases: ["Lightweight task tracking","Sprint boards in docs","Personal todo walls"],
    code: `kanban
  Backlog
    setup[Set up repo]
    design[Draft UI mockups]
  In Progress
    auth[Implement auth flow]
  Review
    api[REST API endpoints]
  Done
    ci[CI pipeline]`,
  },
  {
    id: "packet",
    title: "Packet Diagram",
    blurb: "Bit-level layouts of network packets and binary formats.",
    useCases: ["Protocol documentation","Binary format specs","Networking tutorials"],
    code: `packet-beta
0-15: "Source Port"
16-31: "Destination Port"
32-63: "Sequence Number"
64-95: "Acknowledgment Number"
96-99: "Data Offset"
100-105: "Reserved"
106-111: "Flags"
112-127: "Window Size"
128-143: "Checksum"
144-159: "Urgent Pointer"`,
  },
  {
    id: "block",
    title: "Block Diagram",
    blurb: "Composable blocks with columns and nesting. Infrastructure sketches, fast.",
    useCases: ["Infrastructure sketches","System block layouts","Hardware diagrams"],
    code: `block-beta
    columns 3
    db["Database"] app["App Server"] cache["Cache"]
    block:net:3
        columns 1
        lb["Load Balancer"]
    end
    web1["Web 1"] web2["Web 2"] web3["Web 3"]
    lb --> web1
    lb --> web2
    lb --> web3
    web1 --> app
    app --> db
    app --> cache`,
  },
  {
    id: "architecture",
    title: "Architecture Diagram",
    blurb: "Cloud-style architecture with icons, groups, and directional edges.",
    useCases: ["Cloud topology docs","Deployment overviews","Network diagrams"],
    code: `architecture-beta
    group cloud(cloud)[Cloud VPC]

    service lb(server)[Load Balancer] in cloud
    service api(server)[API Servers] in cloud
    service db(database)[Postgres] in cloud
    service cache(disk)[Redis] in cloud

    lb:R -- L:api
    api:B -- T:db
    api:B -- T:cache`,
  },
  {
    id: "sankey",
    title: "Sankey Diagram",
    blurb: "Flows with widths proportional to quantity. Where the energy/money/users go.",
    useCases: ["Energy / budget flows","User funnels","Resource allocation"],
    code: `sankey-beta
Solar, Grid, 120
Wind, Grid, 80
Grid, Homes, 110
Grid, Industry, 60
Grid, Loss, 30`,
  },
  {
    id: "radar",
    title: "Radar Chart",
    blurb: "Multi-axis comparison on a spider web. Spec-sheet showdowns.",
    useCases: ["Product comparisons","Skill assessments","Benchmark summaries"],
    code: `radar-beta
  title "Phone comparison"
  axis b["Battery"], c["Camera"], s["Screen"], p["Price"], w["Weight"]
  curve i["Phone A"]{80, 90, 85, 40, 70}
  curve j["Phone B"]{70, 75, 90, 80, 60}
  max 100
  min 0`,
  },
  {
    id: "treemap",
    title: "Treemap",
    blurb: "Nested rectangles sized by value. Hierarchies you can feel the weight of.",
    useCases: ["Budget breakdowns","Disk / resource usage","Portfolio composition"],
    code: `treemap-beta
"Q3 Revenue"
    "Hardware": 420
    "Software": 310
    "Services"
        "Consulting": 120
        "Support": 90`,
  },
  {
    id: "info",
    title: "Info",
    blurb: "A diagnostic box showing the running Mermaid version. Meta, but it counts as a type.",
    useCases: ["Debugging render issues","Confirming the Mermaid version in a doc pipeline"],
    code: `info`,
  },
]
