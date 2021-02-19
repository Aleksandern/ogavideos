
export interface VideoItem {
  feedItemType: string,
  id: string,
  title: string,
  artist: string,
  trainerName: string,
  description: string,
  duration: number,
  type: string,
  video_url: string,
  meta: {
      s3video: string,
      previewVideo: string,
      channel: {
          name: string,
          logo: string,
      },
      crc32: string,
  },
}
