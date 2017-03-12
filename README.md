# Discogs DJ
Discogs DJ is an application that allows vinyl djs to maintain a record bag of indivudual tracks (with bpm information) from releases saved in their personal [Discogs](https://www.discogs.com/) collections.

## Getting Started
These instructions will get Discogs DJ up and running on your local machine.

### Prerequisites
To run Discogs DJ, please ensure you have the following installed:
  1. [Node.js](https://nodejs.org/en/) with [npm](https://www.npmjs.com/)
  2. [MongoDB](https://www.mongodb.com/)

Of course you'll also need a [Discogs](https://www.discogs.com/) account with at least a few items in your collection!

### Install
After cloning the repository, perform an `npm install` in the project root to install all of Discogs DJ's dependencies.

### Configuration
Every application that consumes information from the Discogs API needs a Consumer Key and Secret. To generate these, go to your [Developer Settings](https://www.discogs.com/settings/developers), and create a new application. Additionally, in order to access your collection data, Discogs DJ needs you discogs username. Specify your `username`, `consumerKey`, and `consumerSecret` in [config.json](config.json)

