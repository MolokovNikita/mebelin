const pool = require("../../config/bdconfig");

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken) {
    const response = await pool.query(
      "SELECT * FROM refresh_sessions_clients WHERE refresh_token=$1",
      [refreshToken],
    );
    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }

  static async createRefreshSession({ id, refreshToken }) {
    await pool.query(
      "INSERT INTO refresh_sessions_clients (client_id, refresh_token) VALUES ($1, $2) RETURNING *",
      [id, refreshToken],
    );
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query(
      "DELETE FROM refresh_sessions_clients WHERE refresh_token=$1",
      [refreshToken],
    );
  }
}

module.exports = RefreshSessionRepository;
