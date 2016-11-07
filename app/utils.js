function printArtists(artists) {
  if (!artists) {
    return 'N/A';
  }
  return artists.map((artist, i) => {
    const { name, join } = artist;
    if (i === artists.length - 1 || join === '') {
      return name;
    }
    return `${name} ${join} `;
  }).join('');
}

module.exports = { printArtists };
