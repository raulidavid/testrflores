# testrflores
TEST FOR SICPA DEVELOPER RFLORES

## DEPENDENCIES AND LIBRARIES

Tecnologías usadas en el software

| DEPENDENCY | LINK |
| ------ | ------ |
| ANGULAR >= 7.3 | [ANGULAR](https://angular.io/) |
| .NET CORE >= 7.0 | [.NET CORE](https://dotnet.microsoft.com/en-us/download) |
| DOCKER >= 20.10.10 | [DOCKER](https://www.docker.com/) |
| AUTHOR | [RAUL FLORES](https://gitlab.com/raulidavid)|

## BACKEND
Open Solution SicpaRflores.sln in Visual Studio 2022 and run the project
RUN MIGRATIONS
```
update-database
```

## FRONTEND
```sh
cd frontend
CUSTOMUID=$(id -u) CUSTOMGID=$(id -g) docker-compose up --build -d --remove-orphans
ng serve madsis --host 0.0.0.0 --port 4500
```
