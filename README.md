# Aligent Back End Challenge

## Overview

This Web API provides functionality for calculating differences between two datetime parameters and converting these differences into various units. It also supports timezone specifications for accurate comparisons across different time zones.

## Features

- Calculate the number of days between two dates.
- Calculate the number of weekdays between two dates.
- Calculate the number of weeks between two dates.
- Calculate the number of weekdays over a specific number of days, starting from a given day of the week.
- Convert the difference between two dates into different units (e.g., seconds, minutes, hours, years).
- Supports timezone comparison for input parameters from different time zones.

## Prerequisites

- **Option 1:** Node.js (v20.x or higher)
- **Option 2:** Docker (v20.x or higher)

## Getting Started

### Option 1: Run Locally with Node.js

1. Clone the repository:

   ```bash
   git clone https://github.com/felipekejo/aligent-be-challenge.git

2. Navigate to the project directory:

   ```bash
   cd aligent-be-challenge

3. Install the dependencies:

   ```bash
   npm install

4. Start the application:

   ```bash
   npm run start:dev

By default, the application will run on http://localhost:3333. You can change the port by setting the PORT environment variable.

### Option 2: Run with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/felipekejo/aligent-be-challenge.git

2. Navigate to the project directory:

   ```bash
   cd aligent-be-challenge

3. Build the Docker image and Start the container using Docker Compose:

   ```bash
   docker-compose up -d

This will start the application on http://localhost:3333.

4. To stop the application:

   ```bash
   docker-compose down

## Configuration

You can configure environment variables in the .env file (for both local and Docker environments). The following variables are available:

- PORT: Specify the port the application should run on (default: 3333).


## Usage

### API Endpoints

1. Calculate Days Between Two Dates

Endpoint: POST /api/days

#### Request Body:

```json
{
	"firstDate":"2020-01-01T00:00:00.123+02:00",
	"secondDate":"2020-01-05T00:00:00.123+02:00"
}
```
##### Response:

  ```json
{
	"difference": 4
}
  ```
Calculate Weekdays Over a Period

2. Calculate Weekdays Between Two Dates

Endpoint: POST /api/weekdays

#### Request Body:

```json
{
	"firstDate":"2020-01-01T00:00:00.123+02:00",
	"secondDate":"2020-01-08T00:00:00.123+02:00"
}
```
##### Response:

```json
{
	"difference": 5
}
```
3. Calculate completed Weeks Between Two Dates

Endpoint: POST /api/weeks

#### Request Body:

```json
{
	"firstDate":"2020-01-01T00:00:00.123+02:00",
	"secondDate":"2020-01-08T00:00:00.123+02:00"
}
```
##### Response:

```json
{
	"difference": 1
}
```

### Important Notes:

#### Time Zone Information
- Time Zone Offsets: The datetime strings provided in the request should include a time zone offset (e.g., +02:00). This time zone information is used to accurately calculate the difference between dates.

- Effect of Time Zone Changes: Changing the time zone offset in the datetime strings will alter the calculation results. Ensure that both firstDate and secondDate are in the same time zone for accurate comparisons, or include time zone information if the dates are in different time zones.

#### Request Body: 
```json
{
  "firstDate": "2020-01-01T00:00:00.123+02:00", // Both parameters are in the same time zone
  "secondDate": "2020-01-05T00:00:00.123+02:00",
  "unit": "hours"  
}
```
##### Response:

```json
{
	"difference": 96
}
```

#### Request Body: (changing time zone)
```json
{
  "firstDate": "2020-01-01T00:00:00.123+02:00", 
  "secondDate": "2020-01-05T00:00:00.123+09:00",// Changing just the time zone
  "unit": "hours"  
}
```
##### Response:

```json
{
	"difference": 89
}
```

#### Optional Parameters:

- Optional unit Parameter: In all endpoints, the unit parameter is optional. If it is not provided or is set to default, the API returns the difference in the original unit (days, weekdays, or weeks).
- Available Units: The unit parameter can be one of the following: seconds, minutes, hours, years, or default.

#### Request Body:
```json
{
  "firstDate": "2020-01-01T00:00:00.123+02:00",
  "secondDate": "2020-01-08T00:00:00.123+02:00",
  "unit": "seconds"  // Optional: can be 'seconds', 'minutes', 'hours', 'years', or 'default'
}
```
##### Response:

```json
{
  "difference": 604800  // If 'unit' is 'seconds', the response will be in seconds.
}

```

### Running Tests
To run the test suite, use the following command:

```bash
npm run test
```


## Code Structure

The code is organized as follows:

```bash

├── src
│   ├── controllers               
│   │   ├── getDays.ts                # Function to get difference in days
│   │   ├── getWeekDays.ts            # Function to get difference in weekdays
│   │   └── getWeeks.ts               # Function to get difference in completed weeks
│   ├── env               
│   │   └── index.ts                  # Handle environment variables and ensure that is
│   ├── routes               
│   │   └── dateTimeApi.ts            # Contains the Fastify API routes
│   ├── utils               
│   │   └── difference-dates.ts       # Contains the Fastify API definitions
│   ├── app.ts                        # Defines the Fastify routes and request handling logic
│   └── server.ts                     # Entry point of the application
├── tests
│   └── difference-dates.spec.ts      # Test cases for the calculation function
│   └── dateTimeApi.spec.ts           # Test cases for the Routes
├── Dockerfile                        # Docker configuration
├── docker-compose.yml                # Docker Compose configuration
├── package.json                      # Project configuration and dependencies
└── README.md                         # Project documentation
```

### Key Points

- **Time Zone Offsets**: Mention that the time zone offset is part of the datetime strings and affects the calculations. This ensures that users understand the importance of including accurate time zone information.
- **Optional `unit` Parameter**: Clearly document the `unit` parameter as optional and explain its possible values.



### Assumptions and Decisions

1. Date Parsing: 
 - ISO 8601 Format: The application assumes that date strings are in ISO 8601 format, which can include the date, time, fractional seconds, and time zone offset. For example, the format 2020-01-01T00:00:00.123+02:00 is used, where:

   - '2020-01-01' specifies the date.
   - 'T' separates the date and time.
   - '00:00:00.123' represents the time with milliseconds.
   - '+02:00' is the time zone offset from Coordinated Universal Time (UTC).
 - Date Handling: All date manipulations are handled using JavaScript's native Date object, which supports parsing and formatting dates in ISO 8601 format, including fractional seconds and time zone offsets.

3. Weekdays: Weekdays are considered to be Monday through Friday. The application excludes Saturday and Sunday from the weekday count. And I am assuming that is just completed days

4. Days: I am assuming that is just completed days

5. Error Handling: Basic error handling is implemented to ensure that invalid inputs return appropriate error messages.

6. Year Calculation: A specialized approach is used for calculating the difference in years between two dates:
- Year Difference Calculation: The difference in years is computed by subtracting the year of the first date from the year of the second date.
- Month and Day Adjustment: To account for partial years, the calculation checks if the end date is earlier in the year than the start date. If so, the year difference is adjusted by subtracting one year. This adjustment ensures that the calculation accurately reflects the complete years between the two dates.
- Example Implementation:
```javascript
const yearDiff = Math.abs(
  new Date(secondDate).getUTCFullYear() -
    new Date(firstDate).getUTCFullYear(),
);

const isEndDateEarlierInYear =
  new Date(secondDate).getUTCMonth() <
    new Date(firstDate).getUTCMonth() ||
  (new Date(secondDate).getUTCMonth() ===
    new Date(firstDate).getUTCMonth() &&
    new Date(secondDate).getUTCDate() < new Date(firstDate).getUTCDate());

return isEndDateEarlierInYear ? yearDiff - 1 : yearDiff;
```
This approach ensures a more accurate representation of the number of complete years between two dates.

#### Libraries

- Fastify: The application uses Fastify as the web framework to build the API endpoints due to its high performance and low overhead.
   - Fastify vs. Express: Express is one of the most popular API frameworks for Node.js. It's been around since 2010 and has a large community of developers. Express is designed to be flexible and easy to use, with a simple and intuitive API. But I decided to use Fastify because of these reasons: 
      - Performance: Fastify is known for its high performance and low overhead, offering better speed and efficiency compared to Express. It’s designed to handle a large number of requests with minimal latency.
      - Built-in Features: Fastify comes with built-in support for schema-based validation (using JSON Schema), logging, and content type parsing, which can reduce the need for additional middleware. Express requires external middleware to achieve similar functionality.
      - Plugin System: Fastify has a powerful plugin system that promotes modularity and code reusability. Express supports middleware, but Fastify’s plugin system is more structured and allows for better encapsulation of functionality.
      - Ecosystem and Community: Express has been around longer and has a larger ecosystem and community. It is widely used and well-documented, which can be advantageous for finding resources and support. Fastify, while newer, has a growing community and is becoming increasingly popular for high-performance applications.
- Zod: Zod is used for schema validation of request payloads, ensuring that the input data adheres to the expected format and types.
