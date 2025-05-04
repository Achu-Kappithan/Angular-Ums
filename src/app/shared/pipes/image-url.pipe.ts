import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  transform(imagePath: string | null): string {
    const baseUrl = 'http://localhost:3001/';
    if (!imagePath) {
      return 'https://i1.sndcdn.com/avatars-000749141740-s9x9e0-t500x500.jpg';
    }
    // Remove 'src/' prefix if it exists
    const cleanedPath = imagePath.replace(/^src\//, '');
    return `${baseUrl}${cleanedPath}`;
  }
}