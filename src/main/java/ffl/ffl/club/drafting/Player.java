package ffl.ffl.club.drafting;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "player24")
public class Player {

	@Id
	private String id;
	private String name;
	private String aflClub;
	private int priority; // <500 want, 500 dont care, >500 avoid
	private String pos; // K,H,M,T,G,R,S
	private String comment;
	private String draftedBy;
	private int cents;
  private Date draftedTs;
	private int played;
	// stats are averages*10
	private int kicks;
	private int handballs;
	private int marks;
	private int tackles;
	private int goals;
	private int hitouts;
	private int star;

	public Player() {
		super();
	}

	public Player(String name, String aflClub) {
		super();
		this.name = name;
		this.aflClub = aflClub;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAflClub() {
		return aflClub;
	}

	public void setAflClub(String aflClub) {
		this.aflClub = aflClub;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public String getPos() {
		return pos;
	}

	public void setPos(String pos) {
		this.pos = pos;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDraftedBy() {
		return draftedBy;
	}

	public void setDraftedBy(String draftedBy) {
		this.draftedBy = draftedBy;
	}

	public int getCents() {
		return cents;
	}

	public void setCents(int cents) {
		this.cents = cents;
	}

  public Date getDraftedTs()
  {
    return draftedTs;
  }

  public void setDraftedTs(Date draftedTs)
  {
    this.draftedTs = draftedTs;
  }

  // stats
	
	public int getPlayed() {
		return played;
	}

	public void setPlayed(int played) {
		this.played = played;
	}

	public int getKicks() {
		return kicks;
	}

	public void setKicks(int kicks) {
		this.kicks = kicks;
	}

	public int getHandballs() {
		return handballs;
	}

	public void setHandballs(int handballs) {
		this.handballs = handballs;
	}

	public int getMarks() {
		return marks;
	}

	public void setMarks(int marks) {
		this.marks = marks;
	}

	public int getTackles() {
		return tackles;
	}

	public void setTackles(int tackles) {
		this.tackles = tackles;
	}

	public int getGoals() {
		return goals;
	}

	public void setGoals(int goals) {
		this.goals = goals;
	}

	public int getHitouts() {
		return hitouts;
	}

	public void setHitouts(int hitouts) {
		this.hitouts = hitouts;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", name=" + name + ", aflClub=" + aflClub + ", draftedBy=" + draftedBy + ", cents="
				+ cents + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Player other = (Player) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
