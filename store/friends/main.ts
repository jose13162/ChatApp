import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Meta, User } from "~/models";
import { $axios } from "~/utils/nuxt-instance";

interface IndexPayload {
  page?: number;
  perPage: number;
}

@Module({ name: "friends/main", stateFactory: true, namespaced: true })
export default class Friend extends VuexModule {
  private friends = [] as User[];
  private meta = {} as Meta;

  public get $all() {
    return this.friends;
  }

  public get $meta() {
    return this.meta;
  }

  @Mutation
  UPDATE_FRIENDS(friends: User[]) {
    this.friends.push(...friends);
  }

  @Mutation
  UPDATE_META(meta: Meta) {
    this.meta = meta;
  }

  @Action({ rawError: true })
  public async index({ page, perPage }: IndexPayload) {
    const { data: friends, meta } = await $axios.$get(
      `/friendships?page=${page}&perPage=${perPage}`
    );

    this.context.commit("UPDATE_FRIENDS", friends);
    this.context.commit("UPDATE_META", meta);
  }
}
