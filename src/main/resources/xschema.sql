drop table if exists ffl_player_game;
drop table if exists ffl_player_season;
drop table if exists ffl_club_game;
drop table if exists ffl_club_season;
drop table if exists ffl_club;
drop table if exists ffl_game;
drop table if exists ffl_round;
drop table if exists ffl_season;

drop table if exists afl_player_game;
drop table if exists afl_player_season;
drop table if exists afl_player;
drop table if exists afl_club_game;
drop table if exists afl_club_season;
drop table if exists afl_club;
drop table if exists afl_game;
drop table if exists afl_round;
drop table if exists afl_season;

-- AFL

-- league

create table afl_season (
  name          varchar(8) not null,
  primary key (name)
);

create table afl_round (
  season_name   varchar(8) not null,
  name          varchar(8) not null,
  primary key (season_name, name),
  foreign key (season_name) references afl_season on update cascade
);

create table afl_game (
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  seq           int not null,
  primary key (season_name, round_name, seq),
  foreign key (season_name, round_name) references afl_round on update cascade
);

-- club

create table afl_club (
  name          varchar(8) not null,
  primary key (name)
);

create table afl_club_season (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  primary key (club_name, season_name),
  foreign key (club_name) references afl_club on update cascade,
  foreign key (season_name) references afl_season on update cascade
);

create table afl_club_game (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  game_seq      int not null,
  primary key (club_name, season_name, round_name, game_seq),
  foreign key (club_name, season_name) references afl_club_season on update cascade,
  foreign key (season_name, round_name, game_seq) references afl_game on update cascade
);

-- player

create table afl_player (
  id            int not null,
  name          varchar(50) not null,
  primary key (id)
);

create table afl_player_season (
  id            int not null,
  p_id          int not null,
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  status        varchar(8) not null check (status in ('Active', 'Injured', 'Retired')) default 'Active',
  comment       varchar(255),
  primary key (id),
  foreign key (p_id) references afl_player,
  foreign key (club_name, season_name) references afl_club_season on update cascade
);

create table afl_player_game (
  id            int not null,
  ps_id         int not null,
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  game_seq      int not null,
  primary key (id),
  foreign key (ps_id) references afl_player_season,
  foreign key (club_name, season_name, round_name, game_seq) references afl_club_game on update cascade
);

-- FFL

-- league

create table ffl_season (
  name          varchar(8) not null,
  primary key (name)
);

create table ffl_round (
  season_name   varchar(8) not null,
  name          varchar(8) not null,
  primary key (season_name, name),
  foreign key (season_name) references ffl_season on update cascade
);

create table ffl_game (
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  seq           int not null,
  primary key (season_name, round_name, seq),
  foreign key (season_name, round_name) references ffl_round on update cascade
);

-- club

create table ffl_club (
  name          varchar(8) not null,
  status        varchar(8) not null check (status in ('Active', 'Inactive')) default 'Active',
  manager_email varchar(100),
  primary key (name)
);

create table ffl_club_season (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  primary key (club_name, season_name),
  foreign key (club_name) references ffl_club on update cascade,
  foreign key (season_name) references ffl_season on update cascade
);

create table ffl_club_game (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  game_seq      int not null,
  primary key (club_name, season_name, round_name, game_seq),
  foreign key (club_name, season_name) references ffl_club_season on update cascade,
  foreign key (season_name, round_name, game_seq) references ffl_game on update cascade
);

-- player

create table ffl_player_season (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  afl_ps_id     int not null,
  status        varchar(8) not null check (status in ('Active', 'LTI', 'Inactive')) default 'Active',
  draft_order   int,
  cost          int,
  comment       varchar(255),
  primary key (club_name, season_name, afl_ps_id),
  foreign key (club_name, season_name) references ffl_club_season on update cascade,
  foreign key (afl_ps_id) references afl_player_season
);

create table ffl_player_game (
  club_name     varchar(8) not null,
  season_name   varchar(8) not null,
  round_name    varchar(8) not null,
  game_seq      int not null,
  afl_ps_id     int not null,
  afl_pg_id     int,
  primary key (club_name, season_name, round_name, game_seq, afl_ps_id),
  foreign key (club_name, season_name, afl_ps_id) references ffl_player_season on update cascade,
  foreign key (club_name, season_name, round_name, game_seq) references ffl_club_game on update cascade,
  foreign key (afl_pg_id) references afl_player_game
);
