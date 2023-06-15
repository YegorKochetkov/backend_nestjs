import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getReadme(host: string) {
    return `
			<h1>Endpoints</h1>
			<p>Get all users - <a href='http://${host}/api/users'>/api/users</a></p>
		`;
  }
}
