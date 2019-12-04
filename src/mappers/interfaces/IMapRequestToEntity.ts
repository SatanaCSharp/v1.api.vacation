export interface IMapRequestToEntity<R, T> {
    mapRequestToEntity(req: R): T;
}
