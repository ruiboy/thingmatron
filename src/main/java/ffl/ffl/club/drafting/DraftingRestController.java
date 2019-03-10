package ffl.ffl.club.drafting;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin
public class DraftingRestController {

	@Autowired
	PlayerRepository playerRepo;

	@ResponseBody
	@RequestMapping(value = "/drafting/getAllPlayers", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getAllPlayers() {
		return playerRepo.findAll(new Sort("club"));
	}

  @ResponseBody
	@RequestMapping(value = "/drafting/getSortDraftedBy", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getSortDraftedBy() {
		return playerRepo.findAll(new Sort(new Order(Direction.DESC, "draftedBy"), new Order(Direction.ASC, "pos"),
				new Order(Direction.ASC, "priority"), new Order(Direction.ASC, "club")));
	}

	@ResponseBody
	@RequestMapping(value = "/drafting/getSortAvailable", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getSortAvailable() {
		return playerRepo.findAll(new Sort(new Order(Direction.ASC, "draftedBy"), new Order(Direction.ASC, "priority"),
				new Order(Direction.ASC, "pos"), new Order(Direction.DESC, "hitouts"), new Order(Direction.DESC, "star"),
				new Order(Direction.DESC, "tackles"), new Order(Direction.DESC, "goals"), new Order(Direction.DESC, "kicks"),
				new Order(Direction.DESC, "handballs"), new Order(Direction.DESC, "marks")));
	}

	@ResponseBody
	@RequestMapping(value = "/drafting/getSortWanted", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getSortWanted() {
		return playerRepo.findAll(new Sort(new Order(Direction.ASC, "priority"), new Order(Direction.ASC, "pos"),
				new Order(Direction.DESC, "hitouts"), new Order(Direction.DESC, "star"), new Order(Direction.DESC, "tackles"),
				new Order(Direction.DESC, "goals"), new Order(Direction.DESC, "kicks"), new Order(Direction.DESC, "handballs"),
				new Order(Direction.DESC, "marks")));
	}

	@ResponseBody
	@RequestMapping(value = "/drafting/getSortAflClub", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getSortAflClub() {
		return playerRepo.findAll(new Sort("aflClub", "club"));
	}

  @ResponseBody
  @RequestMapping(value = "/drafting/getSortStat/{stat}", method = RequestMethod.GET, produces = "application/json")
  public Collection<Player> getSortStat(@PathVariable("stat") String stat) {
    return playerRepo.findAll(new Sort(new Order(Direction.DESC, stat), new Order(Direction.ASC, "priority")));
  }

	@ResponseBody
	@RequestMapping(value = "/drafting/getByComment/{comment}", method = RequestMethod.GET, produces = "application/json")
	public Collection<Player> getByComment(@PathVariable("comment") String comment) {
		return playerRepo.findByDraftedByAndCommentLikeIgnoreCase("", comment);
	}

	@ResponseBody
	@RequestMapping(value = "/drafting/updatePlayer", method = RequestMethod.POST, produces = "application/json")
	public Player updatePlayer(@RequestBody PlayerWrapper player) {
		return playerRepo.save(player.getPlayer());
	}

  @ResponseBody
	@RequestMapping(value = "/drafting/getTeam/{club}", method = RequestMethod.GET, produces = "application/json")
	public Team getTeam(@PathVariable("club") String club) {
		return new Team(playerRepo, club);
	}

  public static class Team {
	  private String club;
    private List<Player> g;
    private List<Player> k;
    private List<Player> h;
    private List<Player> m;
    private List<Player> t;
    private List<Player> r;
    private List<Player> s;
		private List<Player> x;

    public Team(PlayerRepository repo, String club)
    {
      this.club = club;
      g = repo.findByDraftedByAndPosOrderByPriority(club, "G");
      k = repo.findByDraftedByAndPosOrderByPriority(club, "K");
      h = repo.findByDraftedByAndPosOrderByPriority(club, "H");
      m = repo.findByDraftedByAndPosOrderByPriority(club, "M");
      t = repo.findByDraftedByAndPosOrderByPriority(club, "T");
      r = repo.findByDraftedByAndPosOrderByPriority(club, "R");
      s = repo.findByDraftedByAndPosOrderByPriority(club, "S");
			x = repo.findByDraftedByAndPosOrderByPriority(club, "");
    }

    public String getClub()
    {
      return club;
    }

    public List<Player> getG()
    {
      return g;
    }

    public List<Player> getK()
    {
      return k;
    }

    public List<Player> getH()
    {
      return h;
    }

    public List<Player> getM()
    {
      return m;
    }

    public List<Player> getT()
    {
      return t;
    }

    public List<Player> getR()
    {
      return r;
    }

    public List<Player> getS()
    {
      return s;
    }

		public List<Player> getX()
		{
			return x;
		}

		@java.lang.Override
    public java.lang.String toString()
    {
      return "Team{" +
          "club='" + club + '\'' +
          ", g=" + g +
          ", k=" + k +
          ", h=" + h +
          ", m=" + m +
          ", t=" + t +
          ", r=" + r +
          ", s=" + s +
					", x=" + x +
          '}';
    }
  }

  // gaaaaah - this so can map to incoming json:
	// {"player":{"club":"Carey","aflClub":"NM","comment":"for fux
	// sake","cents":0}}
	// what gives?
	public static class PlayerWrapper {
		private Player player;

		public PlayerWrapper() {
			super();
		}

		public Player getPlayer() {
			return player;
		}

		public void setPlayer(Player player) {
			this.player = player;
		}
	}
}
