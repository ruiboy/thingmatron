package ffl.ffl.club.drafting;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayerRepository extends MongoRepository<Player, String> {
	public List<Player> findByDraftedBy(String draftedBy);
	public List<Player> findByDraftedByAndPosOrderByPriority(String draftedBy, String pos);
	public List<Player> findByDraftedByAndCommentLikeIgnoreCase(String draftedBy, String comment);
}
