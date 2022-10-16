export interface Character {
  id: Number;
  name: String;
  status: String;
  species: String;
  gender: String;
  origin: {
    name: String;
    url: String;
  };
  location: {
    name: String;
    url: String;
  };
  image: String;
  episode: String[];
  favourite: boolean;
}
