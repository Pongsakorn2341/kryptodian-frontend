<a name="readme-top"></a>


<br />
<div align="center">
  <h3 align="center">Kryptodian Portfolio for Test</h3>

  <p align="center">
   Welcome to the Cryptocurrency Portfolio Builder! This project is a powerful, user-friendly **web** application designed to help you build and manage your own cryptocurrency portfolio. Built with the latest technologies, including Next.js 14 App Router, Tailwind CSS, and Shadcn/UI, this application provides a seamless and modern user experience.
    <br />
  </p>
</div>



### Built With

* Next.js 14: Utilized the latest App Router for optimized routing and improved performance.
* Tailwind CSS: For crafting a highly responsive and visually appealing user interface.
* Shadcn/UI: Leveraged Shadcn/UI components for a consistent and polished UI/UX.
* TypeScript: Ensuring type safety and enhanced developer experience.
* API Integration: Integrated with Coin Gecko APIs for fetching real-time cryptocurrency data.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Feature
* User Authentication: Secure login and signup functionality to protect your data.
* Dashboard: A comprehensive dashboard displaying an overview of your cryptocurrency holdings, current market values, and portfolio performance.
* Portfolio Management: Easily add, update, and remove cryptocurrencies from your portfolio.
* Real-time Data: Integration with cryptocurrency market APIs to provide real-time price updates and market trends.
* Responsive Design: Fully responsive layout ensuring optimal user experience on both desktop and mobile devices.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Node.js 20.* and above
* Yarn - [Download & Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). Yarn package manager.

### A typical top-level directory layout

    .
    ├── ...
    ├── kryptodian                    # Your project directory
    │   ├── kryptodian-frontend         # clone and installation frontend
    │   ├────── .env                         # Your Frontend environments
    │   ├── kryptodian-backend         # clone and installation backend
    │   ├────── .env                         # Your Backend environments
    │   └── docker-compose.yml          # docker file for start web application
    └── ...

### Installation

1. Clone the repository.
```bash
$ mkdir kryptodian
$ cd kryptodian
$ git clone https://github.com/Pongsakorn2341/kryptodian-frontend.git
$ git clone https://github.com/Pongsakorn2341/kryptodian-backend.git
```

2. Install the dependencies
```bash
$ yarn install
```

3. Setup ENV

```
NEXTAUTH_URL=                   # Your application url eg. http://localhost:3000
NEXTAUTH_SECRET=                # Your secret or can get from command `openssl rand -base64 32`
NEXT_PUBLIC_BACKEND_URL=        # Your backend url is started at eg. http://localhost:4444
```

### Running the Application

1. Start development
```bash
$ yarn dev
```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Building for Production

```bash
$ yarn build
$ yarn start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Docker Compose file

```yml
version: "3"
services:
  frontend:
    build:
      context: kryptodian-frontend/
    ports:
      - "3000:3000"
    depends_on:
      - backend
      - db
    networks:
      - app-network

  backend:
    build:
      context: kryptodian-backend/
    ports:
      - "4444:4444"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    restart: always

  db:
    image: postgres:13
    container_name: kryptodian_postgres_db
    environment:
      POSTGRES_USER: tottee-user                        # Your database username
      POSTGRES_PASSWORD: tottee-password                # Your database password
      POSTGRES_DB: develop                              # Your database name
    volumes:
      - pg_db_data:/var/lib/postgresql/kryptodian-data
    ports:
      - "5432:5432"
    networks:
      - app-network
    user: "1000:1000"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tottee-user"]  # Must be same value as database username
      interval: 10s
      timeout: 50s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  pg_db_data:

```


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contact

Pongsakorn Parsoppornpiboon - pongsakorn.psb@gmail.com
<br />
Github : https://github.com/Pongsakorn2341

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 