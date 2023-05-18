import request from "request";

export default async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response) => {
      if (error) {
        return res.status(400).json({ errors: [{ msg: "an error occured." }] });
      }

      if (response.statusCode != 200) {
        return res.status(404).json({ errors: [{ msg: "user not found" }] });
      }

      res.status(200).json(JSON.parse(response.body));
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server error" }] });
  }
};
